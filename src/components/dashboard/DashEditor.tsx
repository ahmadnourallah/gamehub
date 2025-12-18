'use client';
import { FilePond, registerPlugin } from 'react-filepond';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import type { Tag } from 'react-tag-input';
import type {
    GameType,
    GenreType,
    PlatformType,
    UpdateResponseType
} from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { getGenres } from '@/actions/genre';
import { getPlatforms } from '@/actions/platform';
import { getPublishers } from '@/actions/publishers';
import { convertErrToStr } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import type { FilePondInitialFile } from 'filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginValidateType from 'filepond-plugin-file-validate-type';
import Button from '@/components/common/Button';
import TagInput from './TagInput';
import toast from 'react-hot-toast';
import Spinner from '../common/Spinner';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';

registerPlugin(FilePondPluginImagePreview, FilePondPluginValidateType);

interface EditModeDashEditor<
    DataKey extends string,
    DataType extends GameType | GenreType | PlatformType
> {
    mode: 'EDIT';
    onSubmit: (
        formData: FormData,
        token: string,
        id: string
    ) => Promise<UpdateResponseType<DataKey, DataType>>;
    item: DataType;
    redirectTo: string;
}

interface AddModeDashEditor<
    DataKey extends string,
    DataType extends GameType | GenreType | PlatformType
> {
    mode: 'ADD';
    onSubmit: (
        formData: FormData,
        token: string
    ) => Promise<UpdateResponseType<DataKey, DataType>>;
    addingGame: boolean;
    redirectTo: string;
}

type DashEditorProps<
    DataKey extends string,
    DataType extends GameType | GenreType | PlatformType
> =
    | AddModeDashEditor<DataKey, DataType>
    | EditModeDashEditor<DataKey, DataType>;

function isEditingGameType<DataKey extends string>(
    props: DashEditorProps<DataKey, GameType | GenreType | PlatformType>
): props is EditModeDashEditor<DataKey, GameType> {
    return props.mode === 'EDIT' && 'title' in props.item;
}

function isAddingGameType<DataKey extends string>(
    props: DashEditorProps<DataKey, GameType | GenreType | PlatformType>
): props is EditModeDashEditor<DataKey, GameType> {
    return props.mode === 'ADD' && props.addingGame;
}

function convertToTagArr(arr: GenreType[] | PlatformType[]): Tag[] {
    return arr.map((item) => {
        return {
            id: item.name,
            text: item.name,
            className: ''
        };
    });
}

export default function DashEditor<
    DataKey extends string,
    DataType extends GameType | GenreType | PlatformType
>(props: DashEditorProps<DataKey, DataType>) {
    const isEditing = props.mode === 'EDIT';
    const isEditingGame = isEditingGameType(props);
    const isAddingGame = isAddingGameType(props);
    const [isLoading, setIsLoading] = useState(false);
    const [files, setFiles] = useState<FilePondInitialFile[]>(
        isEditingGame
            ? props.item.images.map((image) => ({
                  source: `${process.env.NEXT_PUBLIC_API}/${image}`,
                  options: {
                      type: 'local'
                  }
              }))
            : []
    );

    const { data: session } = useSession();
    const router = useRouter();
    const ref = useRef<FilePond>(null);
    const [genres, setGenres] = useState<Array<Tag>>(
        isEditingGame ? convertToTagArr(props.item.genres) : []
    );
    const [genreSuggestions, setGenreSuggestions] = useState<Array<Tag>>([]);

    const [platforms, setPlatforms] = useState<Array<Tag>>(
        isEditingGame ? convertToTagArr(props.item.platforms) : []
    );
    const [platformSuggestions, setPlatformSuggestions] = useState<Array<Tag>>(
        []
    );

    const [publishers, setPublishers] = useState<Array<Tag>>(
        isEditingGame ? convertToTagArr(props.item.publishers) : []
    );
    const [publisherSuggestions, setPublisherSuggestions] = useState<
        Array<Tag>
    >([]);

    const genreQuery = useQuery({
        queryKey: ['genres'],
        queryFn: async () => {
            const response = await getGenres();
            if (response.status === 'success') return response;
            else Promise.reject(response.data);
        },
        enabled: isAddingGame || isEditingGame
    });

    const platformQuery = useQuery({
        queryKey: ['platforms'],
        queryFn: async () => {
            const response = await getPlatforms();
            if (response.status === 'success') return response;
            else Promise.reject(response.data);
        },
        enabled: isAddingGame || isEditingGame
    });

    const publisherQuery = useQuery({
        queryKey: ['publishers'],
        queryFn: async () => {
            const response = await getPublishers();
            if (response.status === 'success') return response;
            else Promise.reject(response.data);
        },
        enabled: isAddingGame || isEditingGame
    });

    useEffect(() => {
        if (
            (isAddingGame || isEditingGame) &&
            genreQuery.isSuccess &&
            genreQuery.data
        )
            setGenreSuggestions(convertToTagArr(genreQuery.data.data.genres));
    }, [isAddingGame, isEditingGame, genreQuery.isSuccess, genreQuery.data]);

    useEffect(() => {
        if (
            (isAddingGame || isEditingGame) &&
            platformQuery.isSuccess &&
            platformQuery.data
        )
            setPlatformSuggestions(
                convertToTagArr(platformQuery.data.data.platforms)
            );
    }, [
        isAddingGame,
        isEditingGame,
        platformQuery.isSuccess,
        platformQuery.data
    ]);

    useEffect(() => {
        if (
            (isAddingGame || isEditingGame) &&
            publisherQuery.isSuccess &&
            publisherQuery.data
        )
            setPublisherSuggestions(
                convertToTagArr(publisherQuery.data.data.publishers)
            );
    }, [
        isAddingGame,
        isEditingGame,
        publisherQuery.isSuccess,
        publisherQuery.data
    ]);

    return (
        <div>
            <h1 className="mb-8">
                {isEditing
                    ? `Edit - ${'title' in props.item ? props.item.title : props.item.name}`
                    : 'Add'}
            </h1>
            <form
                id="my-form"
                className="flex w-full flex-col gap-4"
                onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault();

                    const formData = new FormData(e.target as HTMLFormElement);
                    const token = session?.accessToken as string;
                    const pondFiles = ref.current?.getFiles() || [];
                    let response;

                    for (let i = 0; i < pondFiles.length; i++) {
                        formData.append(
                            'images',
                            pondFiles[i].file,
                            pondFiles[i].file.name
                        );
                    }

                    formData.delete('filepond');

                    setIsLoading(true);
                    if (isEditing) {
                        response = await props.onSubmit(
                            formData,
                            token,
                            'title' in props.item
                                ? props.item.id.toString()
                                : props.item.name
                        );
                    } else {
                        response = await props.onSubmit(formData, token);
                    }
                    setIsLoading(false);

                    if (response.status === 'success') {
                        toast.success(
                            `Item has been ${isEditing ? 'updated' : 'added'}!`
                        );
                        router.push(props.redirectTo);
                    } else toast.error(convertErrToStr(response.data));
                }}
            >
                <label className="flex flex-col">
                    <span className="text-lg font-bold">Title</span>
                    <input
                        required
                        className="w-full rounded-md bg-white p-2 text-black"
                        type="text"
                        name={isAddingGame || isEditingGame ? 'title' : 'name'}
                        defaultValue={
                            isEditing
                                ? `${'title' in props.item ? props.item.title : props.item.name}`
                                : ''
                        }
                    />
                </label>

                {(isAddingGame || isEditingGame) && (
                    <>
                        <label className="flex flex-col">
                            <span className="text-lg font-bold">
                                Description
                            </span>
                            <textarea
                                required
                                className="h-40 w-full rounded-md bg-white p-2 text-black"
                                defaultValue={
                                    isEditingGame ? props.item.description : ''
                                }
                                name="description"
                            ></textarea>
                        </label>

                        <TagInput
                            name="genres"
                            label="Genres"
                            items={genres}
                            setState={setGenres}
                            suggestions={genreSuggestions}
                        />

                        <TagInput
                            name="platforms"
                            label="Platforms"
                            items={platforms}
                            setState={setPlatforms}
                            suggestions={platformSuggestions}
                        />

                        <TagInput
                            name="publishers"
                            label="Publishers"
                            items={publishers}
                            setState={setPublishers}
                            suggestions={publisherSuggestions}
                        />

                        <FilePond
                            files={files}
                            server={{
                                load: async (source, load) => {
                                    const response = await fetch(source);
                                    const blob = await response.blob();
                                    load(
                                        new File([blob], 'image', {
                                            type: 'image/*'
                                        })
                                    );
                                }
                            }}
                            // Casting is the only solution for now.
                            // See: https://github.com/pqina/react-filepond/issues/245
                            onupdatefiles={(files) =>
                                setFiles(
                                    files as unknown as FilePondInitialFile[]
                                )
                            }
                            ref={ref}
                            imagePreviewHeight={200}
                            allowFileTypeValidation={true}
                            acceptedFileTypes={['image/*']}
                            allowReorder={true}
                            allowImagePreview={true}
                            credits={false}
                            allowMultiple={true}
                            maxFiles={5}
                        />

                        <label className="flex flex-col">
                            <span className="text-lg font-bold">Price</span>
                            <input
                                required
                                className="w-full rounded-md bg-white p-2 text-black"
                                type="number"
                                name="price"
                                defaultValue={
                                    isEditingGame ? props.item.price : 0
                                }
                            />
                        </label>
                    </>
                )}

                <Button
                    disabled={isLoading || !session?.accessToken}
                    className="flex scale-none! justify-center"
                >
                    {isLoading ? <Spinner size="28px" /> : 'Submit'}
                </Button>
            </form>
        </div>
    );
}

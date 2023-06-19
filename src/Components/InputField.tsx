import { Input } from "@material-tailwind/react";

export default function InputField ({ props }: {
    props: {
        label: string;
        name: string;
        id: string;
        type: string;
        placeholder: string;
        required: boolean;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    };
}) {
    return (
        <label className="block">
            <span className="text-gray-700 font-medium px-1">{props.label}
            {props.required? <span className="text-red-500">*</span> : null}
            </span>
            <Input
                className="mt-1 block w-full rounded-md p-1 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                name={props.name}
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={props.onChange}
            />
        </label>
    )
}
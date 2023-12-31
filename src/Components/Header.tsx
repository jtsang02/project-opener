import Button from "./Button";

export default function Header ({ props }: {
    props: {
        heading: string;
        paragraph: string;
    };
}) {
    return (
        <div className="mb-10 ">
            <div className="flex justify-center">
    
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                {props.heading}
            </h2>
            <p className="mt-2 text-center text-lg text-gray-600">
                {props.paragraph} {' '}
            </p>
        </div>
    );
}

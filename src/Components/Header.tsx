import Button from "./Button";

export default function Header ({ props }: {
    props: {
        heading: string;
        paragraph: string;
        linkurl: string; // make it optional
        linkName: string;
    };
}) {
    return (
        <div className="mb-10 ">
            <div className="flex justify-center">
                <a href="https://ghl.ca/">
                    <img
                        alt=""
                        className="h-16 w-auto bg-gray-500 p-1 rounded-md"
                        src="https://ghl.ca/wp-content/uploads/2017/07/logo_White_Red.png"
                    />
                </a>
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                {props.heading}
            </h2>
            <p className="mt-2 text-center text-lg text-gray-600">
                {props.paragraph} {' '}
            </p>
            <div className="text-center mt-2">
                {props.linkurl && <Button props={{
                    linkurl: props.linkurl,
                    linkName: props.linkName
                }} />}
            </div>
        </div>
    );
}

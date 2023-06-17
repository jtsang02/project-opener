import Link from "next/link";

export default function Button ({props}: {
    props: {
        linkurl: string;
        linkName: string;
    }
}) {

    return (
        <button className="mt-1 text-m font-medium bg-gray-300 rounded-lg py-1 px-2 text-red-800 hover:text-red-900 hover:bg-gray-400">
        <Link href={props.linkurl}>
            {props.linkName}
        </Link>
    </button>
    );
}

import { Radio, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react";

export default function RadioBtnGroup({ props }: {
    props: {
        options: {
            label: string;
            option: string;
        }[];
        onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
}) {

    // extract the listitem as a component
    const ListItemComponent = ({ props }: {
        props: {
            label: string;
            option: string;
            // pass in a function to handle the change
            onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        };
    }) => {
        return (
            <ListItem className="p-0">
                <label htmlFor={`horizontal-list-${props.option}`} className="px-3 py-2 flex items-center w-full cursor-pointer">
                    <ListItemPrefix className="mr-3">
                        <Radio
                            name="horizontal-list"
                            id={`horizontal-list-${props.option}`}
                            ripple={false}
                            className="hover:before:opacity-0"
                            containerProps={{
                                className: "p-0"
                            }}
                            value={props.option}
                            onChange={props.onChange}
                        />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="font-sm">{props.label}</Typography>
                </label>
            </ListItem>
        )
    }

    return (
        <List className="flex flex-col border">
            {props.options.map((option) => (
                <ListItemComponent props={{
                    label: option.label,
                    option: option.option,
                    onChange: props.onchange
                }} />
            ))}
        </List>
    )
}
import Staff from "@/Data/Staff";
// helper function to take in a list of contacts by initials
// and return a list of email addresses
// as a string separated by commas
function getEmails (projectContactInitials: string[]) {
    // get the list of staff from the array of initials
    // match the initials to the staff list

    const staffList = Staff.filter((staff: { initials: string; }) => 
        projectContactInitials.includes(staff.initials)
    );

    // get the email addresses from the staff list
    const emailList = staffList.map((staff: { email: string; }) => staff.email);

    // return the email addresses as a string separated by commas
    return emailList.join(", ");
}


// function to return email recipients as a formatted string
export default function emailRecipients (projectContactInitials: string[]) {
    return getEmails(projectContactInitials);
}
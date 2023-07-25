import Staff from '../Models/Staff';

const staff: Staff[]  = [
    // principals
    { name: "Jeff Mitchell", initials: "JDM", role:"principal", email: 'jt@ghl.ca' },
    { name: "John Buscemi", initials: "JB", role:"principal", email: 'jt@ghl.ca' },
    { name: "Jun Kim", initials: "JHK", role:"principal", email: 'jt@ghl.ca'},
    { name: "Adam Nadem", initials: "AN", role:"principal", email:'jtstripes95@gmail.com'},     // test email
    // associates
    { name: "Darrell Li", initials: "DL", role:"associate", email:'jt@ghl.ca'},
    { name: "Claire Yuan", initials: "CY", role:"associate", email:'jt@ghl.ca'},
    // tech staff
    { name: "Josiah Tsang", initials: "JT", role:"tech", email:'jt@ghl.ca'},
    { name: "Morgan Trithart", initials: "MRT", role:"tech", email:'jtstripes95@gmail.com'},  // test email
    { name: "Ruth Morrison", initials: "RM", role:"tech", email:'jt@ghl.ca'},
    // admin
    {name: "Kristina Lang", initials: "KL", role:"admin", email:'jt@ghl.ca'},
    {name: "Cindy Yee", initials: "CYEE", role:"admin", email:'jt@ghl.ca'},
    {name: "Desiree Hodacsek", initials: "DH", role:"admin", email:'jt@ghl.ca'},
    
];

export default staff;
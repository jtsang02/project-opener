interface Client {
    name: string;
    address: string;
    phone: string;
    email: string;    
};

interface Accounting {
    formalContract: boolean;
    feeCategory: string;
    retainer: boolean;
    retainerAmount: number;    // optional
};

interface internalContact {
    principal: string;
    projectManager: string;
    techSupport1: string;
    techSupport2: string; // optional
};

interface Project {
    name: string;
    address: string;
    classification: string[]; // this will be a dropdown or radio button
    client: Client;
    careOfClient: Client; // optional
    accounting: Accounting;
    internalContact: internalContact;
    dueDate: Date;
    notes: string; // this will be a dropdown or radio button
};

export default Project;

// Path: src\Models\Project.ts



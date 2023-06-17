interface Client {
    name: string;
    title: string;      // optional
    phone: string;
    address: string;    
};

interface Accounting {
    formalContract: boolean;
    feeCategory: string;
    retainer: boolean;
};

interface internalContact {
    principal: string;
    projectManager: string;
    techSupport1: string;
    techSupport2: string; // optional
};

interface Project {
    id: number;
    name: string;
    address: string;
    client: Client;
    careOfClient: Client; // optional
    accounting: Accounting;
    classification: string; // this will be a dropdown or radio button
    internalContact: internalContact;
    dueDate: Date;
    status: string; // this will be a dropdown or radio button
};

export default Project;

// Path: src\Models\Project.ts



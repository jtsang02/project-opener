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
    _id: string;
    name: string;
    address: string;
    classification: string[]; 
    client: Client;
    careOfClient: Client; // optional
    accounting: Accounting;
    internalContact: internalContact;
    dueDate: Date;
    notes: string; 
};

export default Project;

// Path: src\Models\Project.ts



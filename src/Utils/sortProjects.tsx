import Project from "@/Models/Project";

export default function sortProjects(projects: Project[]): Project[] {
    // sort projects based on status 
    let sorted =  projects.sort((a, b) => {
        // compare status
        return a.status.localeCompare(b.status);
    }
    );
    console.log(" sorted projects: ", sorted);
    return sorted;
}
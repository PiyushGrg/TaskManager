export interface taskInterface {
    title: string,
    description: string,
    status: "Pending" | "In Progress" | "Completed",
    category: "Work" | "Hobby" | "Personal" | "Others",
    dateToStart: string,
    dateToFinish: string,
    reference: string,
    priority: "Low" | "Medium" | "High",

    _id ? : string,
    createdAt ? : string,
    updatedAt ? : string,
}
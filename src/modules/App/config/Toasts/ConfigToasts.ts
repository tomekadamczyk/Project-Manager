import { useToastsMutations } from "modules/App/components/Toaster/hooks/useToastsMutation";

const toastSuccessMsg = {
    updateTask: "Zadanie zaktualizowane pomyślnie",
    addTask: "Dodano zadanie pomyślnie",
    deleteTask: "Dodano zadanie pomyślnie",
    updateProject: "Dodano zadanie pomyślnie",
    addProject: "Dodano zadanie pomyślnie",
    deleteProject: "Dodano zadanie pomyślnie",
    addTimeReport: "Dodano zadanie pomyślnie",
}


export function ConfigToast() {
    const { addToast } = useToastsMutations();
  
    const options: { [K: string]: () => void } = {
        updateTask: () => addToast({ msg: toastSuccessMsg.updateTask, type: 'success' }),
        addTask: () => addToast({ msg: toastSuccessMsg.addTask, type: 'success' }),
        deleteTask: () => addToast({ msg: toastSuccessMsg.deleteTask, type: 'success' }),

        updateProject: () => addToast({ msg: toastSuccessMsg.updateProject, type: 'success' }),
        addProject: () => addToast({ msg: toastSuccessMsg.addProject, type: 'success' }),
        deleteProject: () => addToast({ msg: toastSuccessMsg.deleteProject, type: 'success' }),

        addTimeReport: () => addToast({ msg: toastSuccessMsg.addTimeReport, type: 'success' }),
    }
  
    return function(name: string) {
        if(options[name]) {
            return options[name]()
        }
    }
}
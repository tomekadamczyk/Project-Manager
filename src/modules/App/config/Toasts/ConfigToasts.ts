import { useToastsMutations } from "modules/App/components/Toaster/hooks/useToastsMutation";

export function ConfigToast() {
    const { addToast } = useToastsMutations();
  
    const options: { [K: string]: () => void } = {
        updateTask: () => addToast({ msg: 'Zadanie zaktualizowane pomyślnie', type: 'success' }),
        addTask: () => addToast({ msg: 'Dodano zadanie pomyślnie', type: 'success' }),
        deleteTask: () => addToast({ msg: 'Usunięto zadanie pomyślnie', type: 'success' }),

        updateProject: () => addToast({ msg: 'Projekt zaktualizowane pomyślnie', type: 'success' }),
        addProject: () => addToast({ msg: 'Dodano projekt pomyślnie', type: 'success' }),
        deleteProject: () => addToast({ msg: 'Usunięto projekt pomyślnie', type: 'success' })
    }
  
    return function(name: string) {
        if(options[name]) {
            return options[name]()
        }
    }
}
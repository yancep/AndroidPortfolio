import * as Yup from "yup";

export const expenseValidator = Yup.array().of(Yup.object().shape({
    currentExpenses: Yup.array().of(
        Yup.object().shape({
            expense_element: Yup.string(),
            amounts: Yup.array().of(
                Yup.object().shape({
                    currency: Yup.string(),
                    amount: Yup.number().min(1, "El monto no puede ser negativo")
                })
            ).min(1, "Debe agregar al menos un monto")
        })
    ).min(1, "Debe registrar al menos un gasto"),
})).min(1, ("Debe registrar al menos un gasto"));

export const financingValidator = Yup.array().of(Yup.object().shape({
    currentFinancing: Yup.array().of(
        Yup.object().shape({
            financing_source: Yup.string(),
            amounts: Yup.array().of(
                Yup.object().shape({
                    currency: Yup.string(),
                    amount: Yup.number().min(1, "El monto no puede ser negativo")
                })
            ).min(1, "Debe agregar al menos un monto")
        })
    ).min(1, "Debe registrar al menos un financiamiento"),
})).min(1, ("Debe registrar al menos un financiamiento"));
export interface ValidationError {
    field: string
    message: string
}

export function validateFoodInput(data: {
    name?: string | null
    energy?: number | null
    protein?: number | null
    fat?: number | null
    carbonhydrate?: number | null
    amount?: number | null
}): ValidationError[] {
    const errors: ValidationError[] = []

    // Name validation
    if (!data.name || data.name.trim().length === 0) {
        errors.push({ field: 'name', message: 'Food name is required' })
    }

    // Energy validation (kcal per 100g)
    if (data.energy === null || data.energy === undefined) {
        errors.push({ field: 'energy', message: 'Energy is required' })
    } else if (data.energy < 0) {
        errors.push({ field: 'energy', message: 'Energy cannot be negative' })
    } else if (data.energy > 9000) { // Most caloric foods are < 9000 kcal/100g (oils, fats)
        errors.push({ field: 'energy', message: 'Energy value seems too high (max 9000 kcal/100g)' })
    }

    // Protein validation (g per 100g)
    if (data.protein === null || data.protein === undefined) {
        errors.push({ field: 'protein', message: 'Protein is required' })
    } else if (data.protein < 0) {
        errors.push({ field: 'protein', message: 'Protein cannot be negative' })
    } else if (data.protein > 100) { // Max ~100g protein per 100g for pure protein
        errors.push({ field: 'protein', message: 'Protein value cannot exceed 100g per 100g' })
    }

    // Fat validation (g per 100g)
    if (data.fat === null || data.fat === undefined) {
        errors.push({ field: 'fat', message: 'Fat is required' })
    } else if (data.fat < 0) {
        errors.push({ field: 'fat', message: 'Fat cannot be negative' })
    } else if (data.fat > 100) { // Max 100g fat per 100g for pure fat
        errors.push({ field: 'fat', message: 'Fat value cannot exceed 100g per 100g' })
    }

    // Carbohydrates validation (g per 100g)
    if (data.carbonhydrate === null || data.carbonhydrate === undefined) {
        errors.push({ field: 'carbonhydrate', message: 'Carbohydrates are required' })
    } else if (data.carbonhydrate < 0) {
        errors.push({ field: 'carbonhydrate', message: 'Carbohydrates cannot be negative' })
    } else if (data.carbonhydrate > 100) { // Max 100g carbs per 100g for pure carbs
        errors.push({ field: 'carbonhydrate', message: 'Carbohydrates value cannot exceed 100g per 100g' })
    }

    // Amount validation (g)
    if (data.amount === null || data.amount === undefined) {
        errors.push({ field: 'amount', message: 'Amount is required' })
    } else if (data.amount < 1) {
        errors.push({ field: 'amount', message: 'Amount must be at least 1g' })
    } else if (data.amount > 10000) { // Reasonable max for single serving
        errors.push({ field: 'amount', message: 'Amount seems too large (max 10000g)' })
    }

    return errors
}

export function hasValidationErrors(errors: ValidationError[]): boolean {
    return errors.length > 0
}

export function getErrorMessage(errors: ValidationError[]): string {
    if (errors.length === 1) {
        return errors[0].message
    }
    if (errors.length > 1) {
        return `Multiple errors:\n${errors.map(e => `- ${e.message}`).join('\n')}`
    }
    return 'Validation failed'
}

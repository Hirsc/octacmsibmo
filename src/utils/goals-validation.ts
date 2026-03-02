export interface ValidationError {
    field: string
    message: string
}

export function validateGoalsInput(data: {
    energy?: number | null
    protein?: number | null
    fat?: number | null
    carbonhydrate?: number | null
}): ValidationError[] {
    const errors: ValidationError[] = []

    // Energy validation (kcal per day)
    if (data.energy === null || data.energy === undefined) {
        errors.push({ field: 'energy', message: 'Energy goal is required' })
    } else if (data.energy < 500) {
        errors.push({ field: 'energy', message: 'Energy goal must be at least 500 kcal/day' })
    } else if (data.energy > 10000) {
        errors.push({ field: 'energy', message: 'Energy goal seems too high (max 10000 kcal/day)' })
    }

    // Protein validation (g per day)
    if (data.protein === null || data.protein === undefined) {
        errors.push({ field: 'protein', message: 'Protein goal is required' })
    } else if (data.protein < 10) {
        errors.push({ field: 'protein', message: 'Protein goal must be at least 10g/day' })
    } else if (data.protein > 300) {
        errors.push({ field: 'protein', message: 'Protein goal seems too high (max 300g/day)' })
    }

    // Fat validation (g per day)
    if (data.fat === null || data.fat === undefined) {
        errors.push({ field: 'fat', message: 'Fat goal is required' })
    } else if (data.fat < 10) {
        errors.push({ field: 'fat', message: 'Fat goal must be at least 10g/day' })
    } else if (data.fat > 200) {
        errors.push({ field: 'fat', message: 'Fat goal seems too high (max 200g/day)' })
    }

    // Carbohydrates validation (g per day)
    if (data.carbonhydrate === null || data.carbonhydrate === undefined) {
        errors.push({ field: 'carbonhydrate', message: 'Carbohydrates goal is required' })
    } else if (data.carbonhydrate < 50) {
        errors.push({ field: 'carbonhydrate', message: 'Carbohydrates goal must be at least 50g/day' })
    } else if (data.carbonhydrate > 500) {
        errors.push({ field: 'carbonhydrate', message: 'Carbohydrates goal seems too high (max 500g/day)' })
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

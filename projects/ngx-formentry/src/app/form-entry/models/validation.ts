export interface Validation {
    type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom' | 'match' | 'jsValidator'
    value?: any
    message?: string
    controls?: string[]
}
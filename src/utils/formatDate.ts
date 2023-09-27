export const formatDate = (date:string) => new Date(date).toLocaleDateString('en-EN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
})
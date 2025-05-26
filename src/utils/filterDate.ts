export const filterLatestDays = <T>(data: Array<T>, days: number, propertyName: keyof T): Array<T> => {
    const filteredData: Array<T> = [];

    const now = new Date()
    const limitDate = new Date()
    limitDate.setDate(now.getDate() - days)
    
    data.forEach(item => {
        const itemDate = new Date(item[propertyName] as string)
        if (itemDate >= limitDate) {
            filteredData.push(item)
        }
    })

    return filteredData
}
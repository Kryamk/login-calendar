export const formatDate = (date: Date): string => {
	const year = date.getFullYear();
	const mounth = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
	const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
	return `${year}.${mounth}.${day}`
}

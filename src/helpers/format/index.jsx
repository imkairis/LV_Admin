export const formatDate = (dateString) => {
  if (!dateString) return '';
  dateString = new Date(dateString);
  const year = dateString.getFullYear();
  const month = String(dateString.getMonth() + 1).padStart(2, '0');
  const day = String(dateString.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatCurrency = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency', currency: 'VND',
  }).format(price);
};
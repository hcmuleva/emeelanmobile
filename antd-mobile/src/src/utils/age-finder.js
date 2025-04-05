function calculateAge(dateString){
  const today = new Date();
  let birthDate;

  if (!dateString) {
    return 0;
  }

  if (dateString?.includes("T")) {
    birthDate = new Date(dateString);
  } else {
    const [year, month, day] = dateString?.split("-")?.map(Number);
    birthDate = new Date(year, month - 1, day);
  }

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

export default calculateAge;

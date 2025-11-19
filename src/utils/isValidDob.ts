const isValidDob = (value: string) => {
  if (!value) return false;

  const dobDate = new Date(value);
  const today = new Date();

  // strip time for safety
  dobDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  // ❌ future date
  if (dobDate > today) return false;

  // check age >= 12
  const minAllowed = new Date();
  minAllowed.setFullYear(minAllowed.getFullYear() - 12);

  // user must be born ON or BEFORE minAllowed
  return dobDate <= minAllowed;

};

export default isValidDob;

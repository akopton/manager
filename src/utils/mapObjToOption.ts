export const mapObjToOption = (obj: { id: string; name: string | null }) => ({
  value: obj.id,
  label: obj.name,
});

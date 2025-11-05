const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export type MealDTO = { id: number; name: string; calories: number };
export type ActivityDTO = { id: number; name: string; duration: number; calories: number };

let MEALS: MealDTO[] = [];
let ACTS: ActivityDTO[] = [];

export async function getMeals() {
  await delay(400);
  return MEALS;
}
export async function addMeal(m: Omit<MealDTO, "id">) {
  await delay(400);
  const meal = { ...m, id: Date.now() };
  MEALS = [meal, ...MEALS];
  return meal;
}
export async function deleteMeal(id: number) {
  await delay(300);
  MEALS = MEALS.filter(m => m.id !== id);
}

export async function getActivities() {
  await delay(400);
  return ACTS;
}
export async function addActivity(a: Omit<ActivityDTO, "id">) {
  await delay(400);
  const act = { ...a, id: Date.now() };
  ACTS = [act, ...ACTS];
  return act;
}
export async function deleteActivity(id: number) {
  await delay(300);
  ACTS = ACTS.filter(x => x.id !== id);
}

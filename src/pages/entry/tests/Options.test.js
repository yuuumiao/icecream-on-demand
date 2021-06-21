import { render, screen } from "@testing-library/react";
import Options from "../Options";

//Mock service worker in tests cummunicate with the test file directly, dont do the api call
test("display image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  //find images
  //For all the test for the server info, it's for sure a async function =>> must use await findBy
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i }); //all the alt text are ending in scoop
  expect(scoopImages).toHaveLength(2);

  //confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("display imga for each toppings from server", async () => {
  render(<Options optionType="toppings" />);
  const toppingImgaes = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImgaes).toHaveLength(3);
  const altText = toppingImgaes.map((element) => element.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});

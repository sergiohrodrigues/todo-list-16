import { CustomUpperCasePipe } from "../customUpperCase.pipe"

describe("CustomUpperCase", () => {
  const customUpperCasePipe = new CustomUpperCasePipe();

  it("should return 'ANGULAR TESTE'", () => {
    const textTransformed = customUpperCasePipe.transform('angular test');
    expect(textTransformed).toEqual('ANGULAR TEST');
  })

  it("should return 'ANGULAR 16'", () => {
    expect(customUpperCasePipe.transform('ANGULAR 16')).toEqual("ANGULAR 16");
  })
})

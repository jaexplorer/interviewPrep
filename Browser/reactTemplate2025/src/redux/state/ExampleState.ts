import { ExampleResponse } from '../../models/example/Example';

export class ExampleState {
  public example: ExampleResponse | undefined;
  public test: number;
}

export const initialExampleState: ExampleState = {
  example: undefined,
  test: 0,
};

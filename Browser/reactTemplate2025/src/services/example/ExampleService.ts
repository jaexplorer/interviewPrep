/* eslint-disable class-methods-use-this */
import axios from 'axios';
import { ExampleRequest, ExampleResponse } from '../../models/example/Example';

class ExampleService {
  private readonly serviceUrl = 'example';
  public async getExampleRequest(data: ExampleRequest): Promise<ExampleResponse> {
    const response = await axios.post<ExampleResponse>(`${this.serviceUrl}/example`, data);
    return response.data;
  }
}

const exampleService = new ExampleService();
export default exampleService;

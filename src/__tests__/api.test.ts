import axios from "axios";
import {
  fetchSuperheroes,
  updateSuperhero,
  createSuperhero,
  // API_URL,
} from "../utils/api";
import type { Superhero } from "../types/Superhero";

export const API_URL = process.env.VITE_API_URL;

// Мок axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("API Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockSuperheroes: Superhero[] = [
    {
      _id: "1",
      nickname: "Test Hero",
      real_name: "Test Real Name",
      origin_description: "Test Origin",
      superpowers: ["Test Powers"],
      catch_phrase: "Test Catch Phrase",
      images: ["/test.jpg"],
    },
  ];

  test("fetchSuperheroes retrieves superheroes successfully", async () => {
    const mockResponse = { data: mockSuperheroes };
    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await fetchSuperheroes();
    expect(mockedAxios.get).toHaveBeenCalledWith(`${API_URL}/api/superheroes`);
    expect(result).toEqual(mockSuperheroes);
  });

  test("createSuperhero creates superhero successfully", async () => {
    const formData = new FormData();
    formData.append("nickname", "Test Hero");
    const mockResponse = { data: mockSuperheroes[0] };
    mockedAxios.post.mockResolvedValue(mockResponse);

    const result = await createSuperhero(formData);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${API_URL}/api/superheroes`,
      formData
    );

    expect(result).toEqual(mockSuperheroes[0]);
  });
  test("updateSuperhero updates superhero successfully", async () => {
    const formData = new FormData();
    formData.append("nickname", "Test Hero Updated");
    const mockResponse = {
      data: { ...mockSuperheroes[0], nickname: "Test Hero Updated" },
    };
    mockedAxios.put.mockResolvedValue(mockResponse);

    const result = await updateSuperhero("1", formData);
    expect(mockedAxios.put).toHaveBeenCalledWith(
      `${API_URL}/api/superheroes/1`,
      formData
    );
    expect(result).toEqual({
      ...mockSuperheroes[0],
      nickname: "Test Hero Updated",
    });
  });
});

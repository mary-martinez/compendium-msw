import { render, screen } from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import App from './App';

const mockPokemon =   [{
    id: 16,
    pokemon: "butterfree",
    url_image: "http://assets.pokemon.com/assets/cms2/img/pokedex/full/012.png",
  }]

//   {
//     id: 4,
//     pokemon: "venusaur-mega",
//     url_image: "http://assets.pokemon.com/assets/cms2/img/pokedex/full/003_f2.png",
//   }
// ]

const server = setupServer(
  rest.get('https://pokedex-alchemy.herokuapp.com/api/pokedex', (req, res, ctx) => res(ctx.json(mockPokemon)))
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App should render a searchable list of pokemon', () => {
  it('should render a heading and list of pokemon', async () => {
    render(<App />);
    const loading = screen.getByText(/loading/i);
    const heading = screen.getByText(/world/i);

    // const name = await screen.findByText(/butterfree/i);
    // const images = await screen.findAllByRole('img');
    // screen.debug();
  })

})
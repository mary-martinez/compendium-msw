import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import userEvent from '@testing-library/user-event'
import App from './App';

const mockPokemon = {results: [{
  id: 16,
  pokemon: "butterfree",
  url_image: "http://assets.pokemon.com/assets/cms2/img/pokedex/full/012.png",
}, 
{
  id: 4,
  pokemon: "venusaur-mega",
  url_image: "http://assets.pokemon.com/assets/cms2/img/pokedex/full/003_f2.png",
}
]}

const mockSearchedPokemon = {results: [{
  id: 16,
  pokemon: "butterfree",
  url_image: "http://assets.pokemon.com/assets/cms2/img/pokedex/full/012.png",
}, 
]}




const server = setupServer(
  // rest.get('https://pokedex-alchemy.herokuapp.com/api/pokedex', (req, res, ctx) => {
  //   // console.log('res', res);  
  //   return res(ctx.json(mockPokemon))
  // }),
  rest.get(`https://pokedex-alchemy.herokuapp.com/api/pokedex`, (req, res, ctx) => {
    const search = req.url.searchParams.get('pokemon');
    console.log('search from mocked request', search);
    if (!!search) {
      return res(ctx.json(mockSearchedPokemon))
    } else {
      return res(ctx.json(mockPokemon))
    }
  })
)


describe('App should render a searchable list of pokemon', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  it('should render a heading and list of pokemon', async () => {
    render(<App />);
    const loading = screen.getByText(/loading/i);
    // expect(screen.getByText(/loading/i)).toBeInTheDocument();
    const heading = screen.getByText(/world/i);

    const name = await screen.findByText(/butterfree/i);
    const images = await screen.findAllByRole('img', {timeout: 5000});
    expect(images.length).toEqual(2);

    // await waitForElementToBeRemoved(await screen.findByText('Loading...'), { timeout: 5000 });
    // screen.debug();
    // server.use(rest.get(`https://pokedex-alchemy.herokuapp.com/api/pokedex`))
    const searchBar = screen.getByRole('textbox');
    userEvent.type(searchBar, 'b');
    expect(searchBar.value).toBe('b');
    // const images2 = await screen.findAllByRole('img', {timeout: 5000});
    // expect(images2.length).toEqual(1);
    await waitForElementToBeRemoved(await screen.findByText(/venusaur/i), { timeout: 5000 });
    // waitFor(() => {
      
    //   screen.debug();

    // }, {timeout: 5000})
    // const results = await screen.findAllByRole('img', {timeout: 5000});
    // expect(results.length).toEqual(1);
    
  })

})
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { loadState, saveState } from './saver';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';
import { setJourneys } from './actions/journeys';

// Init middlewares.
const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

// Link Chrome logger extension if it exists.
let composeEnhancers = compose;

switch (window.location.hostname) {
  case 'demo.mijn-app.io':
    break;
  default: {
    composeEnhancers =
      typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Extension options
        })
        : compose;
  }
}

// Link middlewares
let middlewares = null;

switch (window.location.hostname) {
  case 'demo.mijn-app.io':
    middlewares = applyMiddleware(sagaMiddleware, loggerMiddleware);
    break;
  default:
    middlewares = applyMiddleware(sagaMiddleware);
}

// Create store.
export const store = createStore(
  reducers,
  loadState(), // If there is local storage data, load it.
  composeEnhancers(middlewares)
);

// This subscriber writes to local storage anytime the state updates.
store.subscribe(() => {
  saveState(store.getState());
});

// Attach sagas.
sagaMiddleware.run(sagas);

store.dispatch(
  setJourneys([
    {
      title: 'Ik heb een goed idee',
      request_type_id: '06daeb7f-6503-4b8e-8aa1-5a5767b53b22',
      questions: [
        {
          id: '6abbb0e1-3ef5-4206-a2e3-aba72ad1259a',
          type: 'single',
          property: 'Anoniem',
          options: [
            {
              goto: 'f4efa6ca-158b-4184-958f-52ae8b47f561',
              title: 'Nee',
              value: 'Nee',
            },
            {
              goto: 'b52cf9a7-30d1-4eb7-bf64-34f3a6380c11',
              title: 'Ja',
              value: 'Ja',
            },
          ],
          title: 'Wil je je idee anoniem indienen?',
          subtitle:
            'Bij anoniem indienen, kunnen we geen contact met je opnemen ' +
            'bij vragen.',
          optional: {
            goto: null,
          },
        },
        {
          id: 'f4efa6ca-158b-4184-958f-52ae8b47f561',
          type: 'agree',
          property: 'Toestemming',
          options: null,
          title: 'Toestemming voor gebruik gegevens',
          subtitle:
            'Geef je toestemming om jouw voornaam, achternaam en adres mee ' +
            'te sturen met jouw idee?',
          next: 'e8877860-f3b2-46d2-a3b8-e0b70c93492b',
        },
        {
          id: 'b52cf9a7-30d1-4eb7-bf64-34f3a6380c11',
          type: 'text',
          property: 'IdeeOmschrijving',
          options: null,
          title: 'Wat is jouw idee?',
          next: '12e51aa9-0a9b-4e74-a273-65e27763073c',
        },
        {
          id: '12e51aa9-0a9b-4e74-a273-65e27763073c',
          type: 'radioButtons',
          property: 'Contact',
          options: [
            {
              goto: 'END',
              title: 'Ja',
              value: 'Ja',
            },
            {
              goto: 'END',
              title: 'Nee',
              value: 'Nee',
            },
          ],
          title:
            'Vind je het prettig dat er contact met je wordt opgenomen ' +
            'over jouw idee?',
        },
        {
          id: 'e8877860-f3b2-46d2-a3b8-e0b70c93492b',
          type: 'text',
          property: 'IdeeOmschrijving',
          options: null,
          title: 'Wat is jouw idee?',
          subtitle: '',
          next: 'END',
        },
      ],
      overview: {
        needed_documents: ['Geen'],
        send_to: [],
        steps: [
          'Je geeft aan of je anoniem wilt blijven',
          'Je geeft het onderwerp van je idee op',
          'Je beschrijft het idee',
        ],
        subtitle: 'Leuk dat je een goed idee hebt!',
      },
    },
    {
      title: 'Ik wil verhuizen',
      request_type_id: '06daeb7f-6503-4b8e-8aa1-5a5767b53b22',
      questions: [
        {
          id: 'a7beef34-9aea-4891-971d-beb67b2e8010',
          type: 'address',
          property: 'Adress',
          title: 'Wat wordt je nieuwe adres?',
          subtitle: 'Vul je postcode en huisnummer, en kies je nieuwe adres',
          next: 'ffefc10d-18fc-4a57-9431-5f7c8e98f1fb',
        },
        {
          id: 'ffefc10d-18fc-4a57-9431-5f7c8e98f1fb',
          type: 'calendar',
          property: 'IngangsDatum',
          options: null,
          title: 'Wanneer ga je verhuizen?',
          subtitle: 'kies een datum',
          next: '37e30b1f-fb51-4d49-8756-fa5d4d55829a',
        },
        {
          id: '37e30b1f-fb51-4d49-8756-fa5d4d55829a',
          type: 'multiple',
          property: 'MedeVerhuizers',
          options: [
            {
              goto: null,
              title: 'Evelien de Vries',
              value: null,
            },
            {
              goto: null,
              title: 'Thomas de Vries',
              value: null,
            },
          ],
          title: 'Met wie ga je verhuizen?',
          subtitle:
            'Er wordt een bericht gestuurd naar de persoon die meeverhuist ' +
            '(onderstaande personen staan nu op hetzelfde adres als jij ' +
            'ingeschreven)',
          next: '21586109-ce3b-4091-8420-85f92c0a6c11',
        },
        {
          id: '21586109-ce3b-4091-8420-85f92c0a6c11',
          property: 'Eigenaar',
          type: 'single',
          options: [
            {
              goto: 'END',
              title: 'Ja',
              value: null,
            },
            {
              goto: 'END',
              title: 'Nee, ik ga huren',
              value: null,
            },
            {
              goto: '10af45ba-b96c-44cc-865e-5f5342e0b793',
              title: 'Nee, ik ga inwonen',
              value: null,
            },
          ],
          title: 'Ben of word je eigenaar van de woning?',
        },
        {
          id: '10af45ba-b96c-44cc-865e-5f5342e0b793',
          type: 'agree',
          property: 'EigenaarAkoord',
          options: null,
          title: 'Is de eigenaar akkoord met inwoning?',
          subtitle:
            'De eigenaar ontvangt een notificatie in MijnApp ter goedkeuring.',
          next: 'END',
        },
      ],
      overview: {
        needed_documents: ['Geen'],
        send_to: [],
        steps: [
          'Geef je nieuwe adres op.',
          'Geef de datum op wanneer je gaat verhuizen.',
          'Geef aan met wie je gaat verhuizen,',
          'Geef de nieuwe woonsituatie aan.',
        ],
        subtitle: 'Verhuizen binnen of naar Eindhoven',
      },
    },
    {
      title: 'Medeverhuizers test',
      request_type_id: '06daeb7f-6503-4b8e-8aa1-5a5767b53b22',
      questions: [
        {
          id: '37e30b1f-fb51-4d49-8756-fa5d4d55829a',
          type: 'personsMoving',
          property: 'MedeVerhuizers',
          title: 'Met wie ga je verhuizen?',
          subtitle:
            'Er wordt een bericht gestuurd naar de persoon die meeverhuist ' +
            '(onderstaande personen staan nu op hetzelfde adres als jij ' +
            'ingeschreven)',
          next: 'ffefc10d-18fc-4a57-9431-5f7c8e98f1fb',
        },
        {
          id: 'ffefc10d-18fc-4a57-9431-5f7c8e98f1fb',
          type: 'calendar',
          property: 'IngangsDatum',
          options: null,
          title: 'Wanneer ga je verhuizen?',
          subtitle: 'kies een datum',
          next: 'END',
        },
      ],
      overview: {
        needed_documents: ['Geen'],
        send_to: [],
        steps: [
          'Geef je nieuwe adres op.',
          'Geef de datum op wanneer je gaat verhuizen.',
          'Geef aan met wie je gaat verhuizen,',
          'Geef de nieuwe woonsituatie aan.',
        ],
        subtitle: 'Verhuizen binnen of naar Eindhoven',
      },
    }
  ])
);

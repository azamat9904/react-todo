import './App.scss';
import List from './components/list/List';
import listSvg from './assets/img/list.svg';

const mainItem = [
  {
    iconUrl: listSvg,
    text: "Все задачи",
    active: false
  }
];

const items = [
  {
    color: 'green',
    text: 'Покупки',
    active: false
  },
  {
    color: 'blue',
    text: 'Фронтенд',
    active: false
  },
  {
    color: 'pink',
    text: 'Фильмы и Сериалы',
    active: true
  }
];

function App() {
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List items={mainItem} />
        <List items={items} />
      </div>
      <div className="todo__tasks">

      </div>
    </div>
  );
}

export default App;

import styled from 'styled-components';

export const StyledCardList = styled.div`
  display: flex; /* Выстраивает все карточки горизонтально в одну линию */
  flex-direction: row;
  padding: 0;
  margin: 0;
  list-style: none;
  width: max-content; /* Позволяет ленте растягиваться в ширину в зависимости от количества картинок */
  transition-property: transform; /* Говорит браузеру, что нужно анимировать движение */
  transition-timing-function: ease-in-out; /* Делает анимацию плавной (старт и финиш мягче) */
`;


import styled from 'styled-components';

export const StyledSecondaryCard = styled.div`
  width: 300px; /* Фиксированная ширина одной карточки */
  height: 200px; /* Фиксированная высота */
  margin-right: 20px; /* Отступ между слайдами */
  flex-shrink: 0; /* Запрещает карточкам сжиматься, если они не влазят в экран */
  border-radius: 12px; /* Скругление углов карточки */
  overflow: hidden; /* Чтобы картинка внутри не вылезала за скругленные края */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Легкая тень */
  transition: transform 0.3s ease; /* Плавное увеличение при фокусе */

  /* Стили для центральной (активной) карточки, у которой есть класс .main */
  &.main {
    transform: scale(1.05); /* Делает центральный слайд чуть больше остальных */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); /* Делает тень активного слайда глубже */
  }
`;
// tslint:disable: no-unsafe-any no-import-side-effect
// tslint:disable: no-magic-numbers
import {OverlaySettings} from 'root/app/settings-store/settings_store';
import {Match} from 'root/models/match';
import {OverlayConfig} from 'root/models/overlay';
import 'root/windows/css.css';
import 'root/windows/keyrune.css';
import 'root/windows/keyrune.woff2';
import 'root/windows/mana.css';
import 'root/windows/mana.woff2';
import {sendMessageToIpcMain} from 'root/windows/messages';
import 'root/windows/rP2Hp2ywxg089UriCZ2IHSeH.woff2';
import 'root/windows/rP2Hp2ywxg089UriCZOIHQ.woff2';
import {SetMessages} from 'root/windows/overlay/functions/messages_ipcmain';
import {SetHandlers} from 'root/windows/overlay/functions/sethandlers';
import 'root/windows/overlay/overlay.css';
import {UserDeck} from 'root/models/snap_deck';

export const overlayElements = {
  MainOut: document.getElementById('MainOut') as HTMLElement,
  DeckName: document.getElementById('deckName') as HTMLElement,
  MainDeckFrame: document.getElementById('MainDeckFrame') as HTMLElement,
  MoveHandle: document.getElementById('MoveHandle') as HTMLElement,
  OpponentOut: document.getElementById('OpponentOut') as HTMLElement,
  CardHint: document.getElementById('CardHint') as HTMLElement,
  scaleIn: document.getElementById('scaleIn') as HTMLElement,
  scaleOut: document.getElementById('scaleOut') as HTMLElement,
  OpponentOutFrame: document.getElementById('OpponentOutFrame') as HTMLElement,
  OppMoveHandle: document.getElementById('OppMoveHandle') as HTMLElement,
  TransparencyHandle: document.getElementById('TransparencyHandle') as HTMLElement,
  LogoSpan: document.getElementById('LogoSpan') as HTMLElement,
  RestartWarning: document.getElementById('RestartWarning') as HTMLElement,
  AVWarning: document.getElementById('AVWarning') as HTMLElement,
};

const Interactive = document.getElementsByClassName('Interactive');

export const currentMatch = new Match();
export const playerDecks: UserDeck[] = [];
export const userCollection: Map<number, number> = new Map();
export const overlayConfig: OverlayConfig = {
  ovlSettings: undefined,
  allCards: new Map(),
  currentScale: 1,
  currentOpacity: 1,
  dopplerOpacity: -0.1,
  justcreated: true,
  icon: '',
  highlightTimeout: 4000,
  selectedDeck: '',
};

export const icons: {[index: string]: string} = {'': 'w', '2': 'u', '3': 'b', '1': 'r', '4': 'g'};

export function toggleButtonClass(el: HTMLElement, state: boolean): void {
  el.classList.remove('activeButton');
  if (!state) {
    el.classList.add('activeButton');
  }
}

const mouseLeaveHandler = (event: Event) => {
  const e = event as MouseEvent;
  if (e.relatedTarget) {
    sendMessageToIpcMain('disable-clicks', undefined);
  }
};
const mouseEnterHandler = () => {
  sendMessageToIpcMain('enable-clicks', undefined);
};

SetMessages((ovlSettings: OverlaySettings | undefined) => {
  //if (ovlSettings !== undefined && ovlSettings.interactive) {
  Array.from(Interactive).forEach((elem) => {
    elem.addEventListener('mouseleave', mouseLeaveHandler);
    elem.addEventListener('mouseenter', mouseEnterHandler);
    elem.classList.remove('no-hover');
  });
  SetHandlers();
  //setInteractiveHandler(settings);

  /*} else {
    Array.from(Interactive).forEach((elem) => {
      elem.removeEventListener('mouseleave', mouseLeaveHandler);
      elem.removeEventListener('mouseenter', mouseEnterHandler);
      elem.classList.add('no-hover');
    });
    sendMessageToIpcMain('disable-clicks', undefined);
  }*/
});

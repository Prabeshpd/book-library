import DataState from './data/data';
import UIState from './ui/ui';

interface AppState {
  readonly ui: UIState;
  readonly data: DataState;
}

export default AppState;

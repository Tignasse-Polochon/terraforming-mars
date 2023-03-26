import {expect} from 'chai';
import {Game} from '../../../src/server/Game';
import {TileType} from '../../../src/common/TileType';
import {IndustrialCenterAres} from '../../../src/server/cards/ares/IndustrialCenterAres';
import {SpaceBonus} from '../../../src/common/boards/SpaceBonus';
import {ARES_OPTIONS_NO_HAZARDS} from '../../ares/AresTestHelper';
import {TestPlayer} from '../../TestPlayer';
import {cast} from '../../TestingUtils';
import {SelectSpace} from '../../../src/server/inputs/SelectSpace';
import {testGame} from '../../TestGame';

describe('IndustrialCenterAres', function() {
  let card: IndustrialCenterAres;
  let player: TestPlayer;
  let game: Game;

  beforeEach(function() {
    card = new IndustrialCenterAres();
    [game, player] = testGame(2, ARES_OPTIONS_NO_HAZARDS);
  });

  it('Should play', function() {
    game.addCityTile(player, game.board.getAvailableSpacesOnLand(player)[0]);
    expect(game.getCitiesOnMarsCount()).to.eq(1);

    const action = cast(card.play(player), SelectSpace);
    const space = action.availableSpaces[0];
    action.cb(space);
    expect(space.tile?.tileType).to.eq(TileType.INDUSTRIAL_CENTER);
    expect(space.adjacency).to.deep.eq({bonus: [SpaceBonus.STEEL]});
  });
});

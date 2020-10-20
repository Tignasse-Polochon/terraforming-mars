import { expect } from "chai";
import { RestrictedArea } from "../../src/cards/RestrictedArea";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { TileType } from "../../src/TileType";

describe("RestrictedArea", function () {
    let card : RestrictedArea, player : Player, game : Game;

    beforeEach(function() {
        card = new RestrictedArea();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't act if not enough MC", function () {
        player.megaCredits = 1;
        expect(card.canAct(player)).to.eq(false);
    });

    it("Should play", function () {
        const action = card.play(player, game);
        expect(action).not.to.eq(undefined);

        const space = action.availableSpaces[0];

        action.cb(space);
        expect(space.tile && space.tile.tileType).to.eq(TileType.RESTRICTED_AREA);
        expect(space.adjacency?.bonus).eq(undefined);
    });

    it("Should act", function () {
        player.megaCredits = 2;
        expect(card.canAct(player)).to.eq(true);
        card.action(player, game);

        game.runDeferredAction(game.deferredActions[0], () => {});
        expect(player.megaCredits).to.eq(0);
        expect(player.cardsInHand.length).to.eq(1);
    });
});

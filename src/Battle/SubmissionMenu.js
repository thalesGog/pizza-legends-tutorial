import Actions from "../Content/actions";
import KeyboardMenu from "../KeyboardMenu";

class SubmissionMenu {
  constructor({ caster, enemy, onComplete }) {
    this.caster = caster;
    this.enemy = enemy;
    this.onComplete = onComplete;
  }

  decide() {
    this.onComplete({
      action: Actions[this.caster.actions[0]],
      target: this.enemy,
    });
  }

  getPages() {
    const backOption = {
      label: "Go Back",
      description: "Return to previous page",
      handler: () => {
        this.keyboardMenu.setOptions(this.getPages().root);
      },
    };
    return {
      root: [
        {
          label: "Attack",
          description: "Choose an attack",
          handler: () => {
            this.keyboardMenu.setOptions(this.getPages().attacks);
          },
        },
        {
          label: "Items",
          description: "Choose an item",
          handler: () => {
            this.keyboardMenu.setOptions(this.getPages().items);
          },
        },
        {
          label: "Swap",
          description: "Change to another pizza",
          handler: () => {
            console.log("swap button");
          },
        },
      ],
      attacks: [
        ...this.caster.actions.map((key) => {
          const action = Actions[key];
          return {
            label: action.label,
            description: action.label,
            handler: () => {
              this.menuSubmit();
            },
          };
        }),
        backOption,
      ],
      items: [
        //
        backOption,
      ],
    };
  }

  showMenu(container) {
    this.keyboardMenu = new KeyboardMenu();
    this.keyboardMenu.init(container);
    this.keyboardMenu.setOptions(this.getPages().root);
  }

  menuSubmit(action, instanceId = null) {
    this.keyboardMenu?.end();
    this.onComplete({
      action,
      target: action.targetType === "" ? this.enemy : "",
    });
  }

  decide() {
    menuSubmit(Actions[this.caster.actions[0]]);
  }

  init(container) {
    if (this.caster.isPlayerControlled) {
      // Show some UI
      this.showMenu(container);
    } else {
      this.decide();
    }
  }
}

export default SubmissionMenu;

import * as React from 'react';
import { ContextualMenu, DirectionalHint, IContextualMenuItem } from '@fluentui/react/lib/ContextualMenu';
import { ItemCanDispatchTrigger } from './ItemTrigger.types';

/**
 * Parameters to the EditingItem higher-order component
 */
export type ItemWithContextMenuProps<T> = {
  itemComponent: ItemCanDispatchTrigger<T>;
  menuItems: (item: T, onTrigger?: () => void) => IContextualMenuItem[];
};

// `extends any` to trick the parser into parsing as a type decl instead of a jsx tag
export const ItemWithContextMenu = <T extends any>(
  itemWithContextMenuProps: ItemWithContextMenuProps<T>,
): ItemCanDispatchTrigger<T> => {
  return React.memo(selectedItemProps => {
    const [isContextMenuOpen, setIsContextMenuOpen] = React.useState(false);
    function openContextMenu() {
      setIsContextMenuOpen(true);
    }
    function closeContextMenu(e: any) {
      e.preventDefault();
      setIsContextMenuOpen(false);
    }

    const { item, onTrigger } = selectedItemProps;
    const menuItems = React.useMemo(() => itemWithContextMenuProps.menuItems(item, onTrigger), [item, onTrigger]);

    const containerRef = React.useRef<HTMLElement>(null);
    const ItemComponent = itemWithContextMenuProps.itemComponent;

    return (
      <span ref={containerRef}>
        <ItemComponent {...selectedItemProps} onTrigger={openContextMenu} />
        {isContextMenuOpen ? (
          <ContextualMenu
            items={menuItems}
            shouldFocusOnMount={true}
            target={containerRef.current}
            onDismiss={closeContextMenu}
            directionalHint={DirectionalHint.bottomLeftEdge}
          />
        ) : null}
      </span>
    );
  });
};

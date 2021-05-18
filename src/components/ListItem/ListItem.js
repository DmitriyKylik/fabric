import React from 'react';
import {ReactComponent as ArrowUp} from "../../assets/img/arrow_up.svg";
import {ReactComponent as ArrowDown} from "../../assets/img/arrow_down.svg";
import {ReactComponent as RemoveIcon} from "../../assets/img/cancel.svg";
import styles from './ListItem.module.scss';

const ListItem = ({canvasObject, canvas, options}) => {
    return (
        <div
            // onClick={() => {
            //     canvas.setActiveObject(canvasObject);
            // }}
            className={`${styles.listItem} ${options?.isActive ? styles.active : ''}`}
            style={{order: canvas?.getObjects()?.indexOf(canvasObject)}}
        >
            {canvas?.getObjects()?.indexOf(canvasObject) + 1}) {canvasObject?.text}
          <button
            className={styles.displayToggleBtn}
            onClick={() => {
              // canvasObject.set("visible", false);
              canvasObject.visible = !canvasObject.visible;
              canvasObject.isActive = !canvasObject.isActive;
              canvas.discardActiveObject();
              canvas.renderAll();
              canvasObject.fire('toggleVisible');
            }}
          >
            {canvasObject?.visible ? 'hide' : 'visible'}
          </button>
          <div className={styles.navButtonsWrapper}>
              <button
                  className={styles.navButtons}
                  onClick={(event) => {
                      event.stopPropagation();
                      canvasObject?.sendBackwards(false);
                      canvasObject.fire('moveDown');
                  }}>
                  <ArrowUp/>
              </button>
              <button
                  className={styles.navButtons}
                  onClick={(event) => {
                      event.stopPropagation();
                      canvasObject?.bringForward(false);
                      canvasObject.fire('moveUp');
                  }}>
                  <ArrowDown/>
              </button>
          </div>
          <button
              className={styles.removeBtn}
              onClick={(event) => {
                  event.stopPropagation();
                  canvas.remove(canvasObject);
              }}
          >
              <RemoveIcon className={styles.icon}/>
          </button>
        </div>
    );
};

export default ListItem;
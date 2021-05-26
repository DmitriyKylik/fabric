import React, { useState } from 'react';
import {ReactComponent as ArrowUp} from "../../assets/img/arrow_up.svg";
import {ReactComponent as ArrowDown} from "../../assets/img/arrow_down.svg";
import {ReactComponent as RemoveIcon} from "../../assets/img/cancel.svg";
import {ReactComponent as VisibilityIcon} from "../../assets/img/visibility.svg";
import {ReactComponent as VisibilityHideIcon} from "../../assets/img/visibility_hide.svg";
import {ReactComponent as SaveIcon} from "../../assets/img/save.svg";
import styles from './ListItem.module.scss';

const ListItem = ({canvasObject, canvas, options}) => {
  const [inputValue, setInputValue] = useState(canvasObject.name);
  const [inputFocused, setInputFocused] = useState(false);
  const index = canvas?.getObjects()?.indexOf(canvasObject);

  const saveObjectNameHandler = () => {
    canvasObject.name = inputValue;
    canvasObject.fire('update');
    toggleNameInput();
  };

  const toggleNameInput = () => setInputFocused(!inputFocused);

    return (
        <div
            className={`${styles.listItem} ${options?.isActive ? styles.active : ''}`}
            style={{order: index}}
        >
          <span>
            {index + 1})
          </span>
          <div className={styles.inputWrapper}>
            {inputFocused ? (
              <div className={`${styles.inputContainer} ${inputFocused ? styles.active : ''}`}>
                <input
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                />
                <SaveIcon
                  onClick={saveObjectNameHandler}
                  className={styles.icon}
                />

              </div>
            ) : (
              <div
                className={styles.objectName}
                onClick={toggleNameInput}
              >
              {canvasObject.name ? canvasObject.name : '...'}
            </div>
            )}
          </div>
          <div className={styles.navButtonsWrapper}>
            <button
              className={styles.visibilityBtn}
              onClick={() => {
                canvasObject.visible = !canvasObject.visible;
                canvasObject.isActive = !canvasObject.isActive;
                canvas.discardActiveObject();
                canvasObject.fire('update');
              }}
            >
              {canvasObject?.visible
                ? <VisibilityHideIcon className={styles.icon} />
                : <VisibilityIcon className={styles.icon} />}
            </button>
            <div>
              <button
                className={styles.navButtons}
                onClick={(event) => {
                  event.stopPropagation();
                  canvasObject?.sendBackwards(false);
                  canvasObject.fire('update');
                }}>
                <ArrowUp/>
              </button>
              <button
                className={styles.navButtons}
                onClick={(event) => {
                  event.stopPropagation();
                  canvasObject?.bringForward(false);
                  canvasObject.fire('update');
                }}>
                <ArrowDown/>
              </button>
            </div>
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
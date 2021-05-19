import React, { useState } from 'react';
import {ReactComponent as ArrowUp} from "../../assets/img/arrow_up.svg";
import {ReactComponent as ArrowDown} from "../../assets/img/arrow_down.svg";
import {ReactComponent as RemoveIcon} from "../../assets/img/cancel.svg";
import {ReactComponent as VisibilityIcon} from "../../assets/img/visibility.svg";
import {ReactComponent as VisibilityHideIcon} from "../../assets/img/visibility_hide.svg";
import {ReactComponent as SaveIcon} from "../../assets/img/save.svg";
import styles from './ListItem.module.scss';

const ListItem = ({canvasObject, canvas, options}) => {
  const [objectName, setObjectName] = useState(canvasObject.name);
  const [inputFocused, setInputFocused] = useState('');
  const index = canvas?.getObjects()?.indexOf(canvasObject);

  // const saveObjectNameHandler = () => {
  //   canvasObject.name = objectName;
  //   canvas.renderAll();
  //   canvasObject.fire('update');
  // };

    return (
        <div
            // onClick={() => {
            //     canvas.setActiveObject(canvasObject);
            // }}
            className={`${styles.listItem} ${options?.isActive ? styles.active : ''}`}
            style={{order: index}}
        >
          {/*{canvasObject?.name && canvasObject.name}*/}
          <span>
            {index + 1})
          </span>
          <div className={`${styles.inputWrapper} ${!inputFocused ? styles.readOnly : ''}`}>
            <input
              value={objectName}
              onFocus={() => setInputFocused(!inputFocused)}
              onBlur={() => setInputFocused(!inputFocused)}
              onChange={(event) => setObjectName(event.target.value || '...')}
            />
            <SaveIcon
              className={styles.icon}
            />
          </div>
          {/*{canvasObject?.text}*/}
          <div className={styles.navButtonsWrapper}>
            <button
              className={styles.visibilityBtn}
              onClick={() => {
                canvasObject.visible = !canvasObject.visible;
                canvasObject.isActive = !canvasObject.isActive;
                canvas.discardActiveObject();
                canvas.renderAll();
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
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

// components
import {
  ThemeProvider,
  Autocomplete,
  Modal,
  Button
} from '../source/components';

// skins
import {
  AutocompleteSkin,
  ModalSkin,
  ButtonSkin
} from '../source/skins/simple';

// themes
import {
  AutocompleteTheme,
  ModalTheme,
  ButtonTheme
} from '../source/themes/simple';

// custom styles & theme overrides
import styles from './Autocomplete.stories.scss';
import themeOverrides from './styles/customAutocomplete.scss';

const OPTIONS = [
  'home',
  'cat',
  'dog',
  'fish',
  'hide',
  'hover',
  'duck',
  'category',
  'join',
  'paper',
  'box',
  'tab'
];

storiesOf('Autocomplete', module)
  .addDecorator(story => {
    // we could import the entire SimpleTheme default object above
    // but composing our own SimpleTheme object here cuts back on unused
    // imports that are unrelated to the components used in the stories below
    const SimpleTheme = {
      autocomplete: { ...AutocompleteTheme },
      modal: { ...ModalTheme },
      button: { ...ButtonTheme }
    };

    return <ThemeProvider theme={SimpleTheme}>{story()}</ThemeProvider>;
  })

  // ====== Stories ======

  .add('Enter mnemonics - plain', () => (
    <Autocomplete skin={AutocompleteSkin} />
  ))

  .add('Enter mnemonics - label', () => (
    <Autocomplete label="Recovery phrase" skin={AutocompleteSkin} />
  ))

  .add('Enter mnemonics - placeholder', () => (
    <Autocomplete
      label="Recovery phrase"
      placeholder="Enter recovery phrase"
      skin={AutocompleteSkin}
    />
  ))

  .add('Enter mnemonics - error', () => (
    <Autocomplete
      label="Recovery phrase"
      placeholder="Enter recovery phrase"
      error="Please enter mnemonics in right order"
      skin={AutocompleteSkin}
    />
  ))

  .add(
    'Enter mnemonics (9-word mnemonic) - not sorted',
    withState({ selectedOpts: [] }, store => (
      <Autocomplete
        label="Recovery phrase"
        options={OPTIONS}
        placeholder="Enter mnemonic..."
        sortAlphabetically={false}
        multipleSameSelections={false}
        maxSelections={9}
        skin={AutocompleteSkin}
        onChange={selectedOpts => store.set({ selectedOpts })}
      />
    ))
  )

  .add(
    'Enter mnemonics (9-word mnemonic) - sorted with multiple same selections',
    withState({ selectedOpts: [] }, store => (
      <Autocomplete
        label="Recovery phrase"
        options={OPTIONS}
        placeholder="Enter mnemonic..."
        maxSelections={9}
        skin={AutocompleteSkin}
        onChange={selectedOpts => store.set({ selectedOpts })}
      />
    ))
  )

  .add(
    'Enter mnemonics - (12-word mnemonic) with 5 visible suggestions',
    withState({ selectedOpts: [] }, store => (
      <Autocomplete
        label="Recovery phrase"
        options={OPTIONS}
        placeholder="Enter mnemonic..."
        maxSelections={12}
        maxVisibleOptions={5}
        skin={AutocompleteSkin}
        onChange={selectedOpts => store.set({ selectedOpts })}
      />
    ))
  )

  .add(
    'Enter mnemonics - (12-word mnemonic) with 5 visible suggestions - isOpeningUpward',
    withState({ selectedOpts: [] }, store => (
      <Autocomplete
        className={styles.customMargin}
        isOpeningUpward
        label="Recovery phrase"
        options={OPTIONS}
        placeholder="Enter mnemonic..."
        maxSelections={12}
        maxVisibleOptions={5}
        skin={AutocompleteSkin}
        onChange={selectedOpts => store.set({ selectedOpts })}
      />
    ))
  )

  .add(
    'Enter mnemonics - (12-word mnemonic) with 5 visible suggestions and regex that allows only letters',
    withState({ selectedOpts: [] }, store => (
      <Autocomplete
        label="Recovery phrase"
        options={OPTIONS}
        placeholder="Enter mnemonic..."
        maxSelections={12}
        maxVisibleOptions={5}
        invalidCharsRegex={/[^a-zA-Z]/g}
        skin={AutocompleteSkin}
        onChange={selectedOpts => store.set({ selectedOpts })}
      />
    ))
  )

  .add(
    'Enter mnemonics in Modal',
    withState({ isOpen: true, selectedOpts: [] }, store => (
      <Modal
        isOpen={store.state.isOpen}
        triggerCloseOnOverlayClick={false}
        skin={ModalSkin}
      >
        <div className={styles.dialogWrapper}>
          <div className={styles.title}>
            <h1>Autocomplete in Modal</h1>
          </div>
          <div className={styles.content}>
            <Autocomplete
              label="Recovery phrase"
              placeholder="Enter recovery phrase"
              options={OPTIONS}
              maxSelections={12}
              maxVisibleOptions={5}
              invalidCharsRegex={/[^a-zA-Z]/g}
              skin={AutocompleteSkin}
              onChange={selectedOpts => store.set({ selectedOpts })}
            />
          </div>
          <div className={styles.actions}>
            <Button
              onClick={() => store.set({ isOpen: false })}
              className="primary"
              label="Submit"
              skin={ButtonSkin}
            />
          </div>
        </div>
      </Modal>
    ))
  )

  .add(
    'composed theme',
    withState({ selectedOpts: [] }, store => (
      <Autocomplete
        themeOverrides={themeOverrides}
        label="Recovery phrase"
        options={OPTIONS}
        placeholder="Enter mnemonic..."
        maxSelections={12}
        maxVisibleOptions={5}
        invalidCharsRegex={/[^a-zA-Z]/g}
        skin={AutocompleteSkin}
        onChange={selectedOpts => store.set({ selectedOpts })}
      />
    ))
  );

---
name: 'component'
root: './src/components'
output: '**/*'
ignore: []
questions:
  name: 'Please enter component name.'
---

# `{{ inputs.name | camel }}/{{ inputs.name | pascal }}.tsx`

<!-- prettier-ignore -->
```typescript
import React, { FC, useEffect, useState, useMemo } from 'react';
import { useStyles } from './{{ inputs.name | pascal }}Styles';
import { LABELS } from './{{ inputs.name | pascal }}Constants';

interface {{ inputs.name | pascal }}Props {}

const {{ inputs.name | pascal }}:FC<{{ inputs.name | pascal }}Props> = ({}) => {
  const classes = useStyles();
  return (
    <div><div>Hello</div></div>
  );
}

export default {{ inputs.name | pascal }};
```

# `{{ inputs.name | camel }}/{{ inputs.name | pascal }}Constants.ts`

```typescript
export const LABELS = {};
```

# `{{ inputs.name | camel }}/{{ inputs.name | pascal }}Styles.ts`

```typescript
import { theme } from '../../theme/Theme';
import { makeStyles } from '@mui/styles';
import { SIZES } from '../../constants/AppConstants';
import { getFonts } from '../../helpers/GetFonts';

export const useStyles = makeStyles({});
```

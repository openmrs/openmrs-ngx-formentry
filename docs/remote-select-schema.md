# Remote Select JSON Schema

The `remote-select` component is used to create searchable dropdown fields that fetch options from a remote data source. This is useful for large datasets or when options need to be fetched dynamically.

## Basic Schema Structure

```json
{
  "type": "remote-select",
  "id": "questionId",
  "label": "Question Label",
  "required": false,
  "questionOptions": {
    "dataSource": "dataSourceName",
    "dataSourceOptions": {
      // Optional configuration for the data source
    }
  }
}
```

## Complete Example

```json
{
  "type": "remote-select",
  "id": "location",
  "label": "Select Location",
  "required": true,
  "questionOptions": {
    "dataSource": "location_datasource",
    "dataSourceOptions": {
      "tag": "Admission Location"
    }
  },
  "validators": [
    {
      "type": "required"
    }
  ],
  "hide": "false",
  "disable": "false",
  "alert": {
    "when": "expression",
    "message": "Alert message"
  },
  "calculateExpression": "expression",
  "componentConfigs": []
}
```

## Alternative Format (OpenMRS 3.x)

The component also supports the OpenMRS 3.x datasource format:

```json
{
  "type": "remote-select",
  "id": "provider",
  "label": "Select Provider",
  "required": false,
  "questionOptions": {
    "datasource": {
      "name": "provider",
      "config": {
        "concept": "CIEL:123456",
        "otherOption": "value"
      }
    }
  }
}
```

## Schema Properties

### Required Properties

- **`type`**: Must be `"remote-select"`
- **`id`**: Unique identifier for the question
- **`questionOptions`**: Configuration object containing data source information

### Question Options

The `questionOptions` object supports two formats:

#### Format 1: Simple Data Source
```json
"questionOptions": {
  "dataSource": "dataSourceName",
  "dataSourceOptions": {
    // Optional key-value pairs passed to the data source
  }
}
```

#### Format 2: OpenMRS 3.x Data Source
```json
"questionOptions": {
  "datasource": {
    "name": "dataSourceName",
    "config": {
      // Configuration object passed to the data source
    }
  }
}
```

### Optional Properties

- **`label`**: Display label for the question
- **`prefix`**: Prefix text to display before the label
- **`required`**: Boolean indicating if the field is required
- **`validators`**: Array of validation rules
  ```json
  "validators": [
    {
      "type": "required"
    },
    {
      "type": "min",
      "value": 0
    }
  ]
  ```
- **`hide`**: Expression or boolean to hide the question
- **`disable`**: Expression or boolean to disable the question
- **`alert`**: Alert configuration
  ```json
  "alert": {
    "when": "expression",
    "message": "Alert message"
  }
  ```
- **`calculateExpression`**: Expression to calculate the value
- **`componentConfigs`**: Array of component-specific configurations

## Data Source Requirements

The data source must be registered in your application and implement the `DataSource` interface with:

- **`searchOptions(term: string, options?: any): Observable<SelectOption[]>`**: Method to search for options
- **`resolveSelectedValue(value: any): Observable<SelectOption>`**: Method to resolve a selected value

### Example Data Source Registration

```typescript
this.dataSources.registerDataSource('location_datasource', {
  searchOptions: (term: string, options?: any) => {
    // Return Observable<SelectOption[]>
  },
  resolveSelectedValue: (value: any) => {
    // Return Observable<SelectOption>
  }
});
```

## SelectOption Format

The data source should return options in the following format:

```typescript
interface SelectOption {
  label: string;
  value: any;
  // Additional properties as needed
}
```

## Examples

### Example 1: Location Selector
```json
{
  "type": "remote-select",
  "id": "admissionLocation",
  "label": "Admission Location",
  "required": true,
  "questionOptions": {
    "dataSource": "location_datasource",
    "dataSourceOptions": {
      "tag": "Admission Location"
    }
  }
}
```

### Example 2: Provider Selector
```json
{
  "type": "remote-select",
  "id": "provider",
  "label": "Select Provider",
  "required": false,
  "questionOptions": {
    "dataSource": "provider"
  }
}
```

### Example 3: With Validation and Conditional Logic
```json
{
  "type": "remote-select",
  "id": "diagnosis",
  "label": "Select Diagnosis",
  "required": true,
  "questionOptions": {
    "dataSource": "diagnoses",
    "dataSourceOptions": {
      "concept": "CIEL:1284"
    }
  }
}
```

## Notes

- The component automatically handles loading states and error handling
- Options are fetched as the user types (debounced search)
- The component supports both single-select functionality
- The `dataSourceOptions` object is passed directly to the data source's `searchOptions` method, allowing for flexible configuration


import { HistoricalHelperService } from './historical-expression-helper-service';

describe('HistoricalHelperService', () => {
  const concept = '0b49e3e6-55df-4096-93ca-59edadb74b3f';
  const expression = `_.isEmpty(HD.getObject('prevEnc').getValue('${concept}')) ? undefined : HD.getObject('prevEnc').getValue('${concept}')`;
  const encounterDatetime = '2026-10-01T10:00:00.000+0000';

  it('returns the previous value from an expression that calls _.isEmpty', () => {
    const value = new HistoricalHelperService().evaluate(
      expression,
      {
        rawPrevEnc: {
          encounterDatetime,
          obs: [{ concept: { uuid: concept }, value: 'previous answer' }]
        }
      },
      null
    );

    expect(value).toEqual(
      jasmine.objectContaining({ value: 'previous answer' })
    );
  });

  it('returns undefined from that expression when there is no previous value', () => {
    const value = new HistoricalHelperService().evaluate(
      expression,
      { rawPrevEnc: { encounterDatetime, obs: [] } },
      null
    );

    expect(value).toBeUndefined();
  });
});

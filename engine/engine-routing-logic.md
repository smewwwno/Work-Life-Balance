# Engine Routing Logic

## Router outputs

For each incoming request, determine:

1. target role or roles
2. object type
3. required action
4. whether deterministic execution is enough
5. whether LLM support is needed

## Typical routes

- household payment -> Life Operations Manager
- dinner with girlfriend -> Relationship Manager
- fatigue and recovery question -> Body Coach
- weekend activity choice -> Leisure Curator
- course progress planning -> Learning Coach

## Multi-role examples

- weekend with girlfriend + low energy -> Relationship Manager + Leisure Curator + Body Coach
- buy medicine and schedule doctor -> Body Coach + Life Operations Manager

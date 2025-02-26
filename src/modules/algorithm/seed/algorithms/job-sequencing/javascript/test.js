const { jobSequencing } = require('./exercise');

describe('Job Sequencing Algorithm', () => {
  it('should return the optimal job sequence for the given jobs', () => {
    const jobs = [
      { id: 'J1', profit: 85, deadline: 5 },
      { id: 'J2', profit: 25, deadline: 4 },
      { id: 'J3', profit: 16, deadline: 3 },
      { id: 'J4', profit: 40, deadline: 3 },
    ];
    expect(jobSequencing(jobs)).toEqual(['J1', 'J4', 'J3']);
  });

  it('should handle another set of jobs correctly', () => {
    const jobs = [
      { id: 'a', profit: 100, deadline: 2 },
      { id: 'b', profit: 20, deadline: 2 },
      { id: 'c', profit: 40, deadline: 1 },
      { id: 'd', profit: 35, deadline: 3 },
    ];
    expect(jobSequencing(jobs)).toEqual(['c', 'a', 'd']);
  });

  it('should handle empty job list', () => {
    expect(jobSequencing([])).toEqual([]);
  });

  it('should handle jobs with same deadlines', () => {
    const jobs = [
      { id: 'a', profit: 10, deadline: 1 },
      { id: 'b', profit: 15, deadline: 1 },
    ];
    expect(jobSequencing(jobs)).toEqual(['b']);
  });
});

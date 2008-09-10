class DraggingOptions {
  isGridSnapEnabled;
  isGridSnapRealtime;
  gridSnapCellSize;
  gridSnapCellSpot;
  gridSnapOrigin;
  dragsLink;
  dragsTree;
  groupsSnapMembers;
  groupsAlwaysMove;
  dragsMembers;
  constructor(t) {
    this.Ki();
    if (t) Object.assign(this, t);
  }
  Ki() {
    this.isGridSnapEnabled = false;
    this.isGridSnapRealtime = true;
    this.gridSnapCellSize = new Size(NaN, NaN).k();
    this.gridSnapCellSpot = Spot.TopLeft;
    this.gridSnapOrigin = new Point(NaN, NaN).k();
    this.dragsLink = false;
    this.dragsTree = false;
    this.groupsSnapMembers = false;
    this.groupsAlwaysMove = true;
    this.dragsMembers = true;
  }
}

{
  WebAuthUser.verifierId ? (
    <>
      {UserAuthStatus.role === "admin" ? (
        <Route exact path="admin-dashboard" element={<DashboardLayout />}>
          {/*Admin Routes start*/}
          <Route path="create-nft" element={<CreateNft />} />
          <Route path="edit-nft/:TokenId" element={<EditNft />} />
          <Route path="transfer-nft/:TokenId" element={<TransferNft />} />
          <Route exact path="collection" element={<NftGrid />}></Route>
          <Route
            exact
            path="view-single-nft/:TokenId"
            element={<SingleNftCard />}
          ></Route>
          {/*Admin Routes start*/}
        </Route>
      ) : (
        <Route exact path="user-dashboard" element={<DashboardLayout />}>
          <Route path="edit-nft/:TokenId" element={<EditNft />} />
          <Route path="transfer-nft/:TokenId" element={<TransferNft />} />
          <Route exact path="collection" element={<NftGrid />}></Route>
          <Route
            exact
            path="view-single-nft/:TokenId"
            element={<SingleNftCard />}
          ></Route>
        </Route>
      )}
    </>
  ) : (
    <Route element={<Auth />}></Route>
  );
}
